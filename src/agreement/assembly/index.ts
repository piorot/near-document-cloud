import { Context, PersistentVector, storage } from 'near-sdk-as'

export function addAgreement(uri: string, signer: string): void {
  assert(!storage.get<Agreement>(uri), "Agreement already exists");
  storage.set<Agreement>(uri, new Agreement(uri, signer));
}

export function signAgreementByUri(uri: string): void {
  assert(storage.get<Agreement>(uri), "Agreement doesn't exist");
  let agreenemtnToSign = storage.getSome<Agreement>(uri)
  agreenemtnToSign.signAgreement();
  storage.set<Agreement>(uri, agreenemtnToSign);
}

export function addRevision(uri: string, newUri: string): void {
  assert(storage.get<Agreement>(uri), "Agreement doesn't exist");
  assert(Context.sender == storage.getSome<Agreement>(uri).issuer, "Only issuer can update agreement");
  let agreenemtnToUpdate = storage.getSome<Agreement>(uri);
  agreenemtnToUpdate.addAgreementVersion(newUri);
  storage.set<Agreement>(uri, agreenemtnToUpdate);
}

@nearBindgen
export class Agreement {
  issuer: string;
  isSigned: boolean;
  versions: PersistentVector<string>;
  constructor(public uri: string, public signer: string) {
    this.issuer = Context.sender;
    this.isSigned = false;
    this.versions = new PersistentVector<string>(`${uri}-v`);
    this.versions.push(uri);
    this.uri = uri;
  }


  @mutateState()
  addAgreementVersion(version: string): void{
    assert(Context.sender == this.issuer, "Only issuer can update agreement");
    this.versions.push(version);
    this.isSigned = false;
  }

  @mutateState()
  signAgreement(): void{
    assert(Context.sender == this.signer, "You're not allowed to sign this");
    this.isSigned = true;
  }


}