#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Call 'addAgreement' function on the contract"
echo
echo ---------------------------------------------------------
echo
read -p "Press enter to continue"

near call $CONTRACT addAgreement '{"uri": "uri1", "signer": "piorot.testnet"}' --accountId $CONTRACT

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Call 'signAgreement' function on the contract"
echo
echo ---------------------------------------------------------
echo
read -p "Press enter to continue"

near call $CONTRACT signAgreementByUri '{"uri": "uri1"}' --accountId piorot.testnet

echo
echo
echo ---------------------------------------------------------
echo "Step 3: Call 'addRevision' function on the contract"
echo
echo ---------------------------------------------------------
echo
read -p "Press enter to continue"

near call $CONTRACT addRevision '{"uri": "uri1", "newUri": "uri1.updated1"}' --accountId $CONTRACT

echo
echo
echo ---------------------------------------------------------
echo "Step 4: Call 'signAgreement' function on the contract"
echo
echo ---------------------------------------------------------
echo
read -p "Press enter to continue"

near call $CONTRACT signAgreementByUri '{"uri": "uri1"}' --accountId piorot.testnet
