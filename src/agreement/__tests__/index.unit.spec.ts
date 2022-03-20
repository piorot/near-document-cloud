import { VMContext } from "near-sdk-as";
import { Agreement } from "../assembly";

const signer = "piorot.testnet";
const issuer = "Big Company Selling Electricity inc";

let contract: Agreement;

beforeEach(() => {
  VMContext.setSigner_account_id(issuer);
  contract = new Agreement("ipfs://doc1", signer);
});

describe("Agreement", () => {
  describe("Agreement initialization", () => {
    it("agreement issuer should be set", () => {
      expect(contract.issuer).toStrictEqual(issuer);
    });

    it("signer should be set", () => {
      expect(contract.signer).toStrictEqual(signer);
    });

    it("document uri should be set", () => {
      expect(contract.uri).toStrictEqual("ipfs://doc1");
    });

    it("agreement should not be signes after initialization", () => {
      expect(contract.isSigned).toStrictEqual(false);
    });

    it("agreement should have first doc in versions collection", () => {
      expect(contract.versions).toHaveLength(1);
      expect(contract.versions.first).toStrictEqual(contract.uri);
    });
  });

  describe("Agreement signing", () => {
    it("should throw when signer is not inteded signer", () => {
      VMContext.setSigner_account_id("hacker");
      expect(() => {
        contract.signAgreement();
      }).toThrow();
    });

    it("should not throw when signer is intended signer", () => {
      VMContext.setSigner_account_id("piorot.testnet");
      expect(() => {
        contract.signAgreement();
      }).not.toThrow();
    });

    it("agreement should be signed ", () => {
        VMContext.setSigner_account_id("piorot.testnet");
        contract.signAgreement();
        expect(contract.isSigned).toBeTruthy();
      });
  });
});
