describe('TransactionEnvelope', function() {
  it('can successfully decode an envelope', function(done) {
    // from https://github.com/stellar/js-stellar-sdk/issues/73
    let xdr =
      'AAAAAPQQv+uPYrlCDnjgPyPRgIjB6T8Zb8ANmL8YGAXC2IAgAAAAZAAIteYAAAAHAAAAAAAAAAAAAAABAAAAAAAAAAMAAAAAAAAAAUVVUgAAAAAAUtYuFczBLlsXyEp3q8BbTBpEGINWahqkFbnTPd93YUUAAAAXSHboAAAAABEAACcQAAAAAAAAAKIAAAAAAAAAAcLYgCAAAABAo2tU6n0Bb7bbbpaXacVeaTVbxNMBtnrrXVk2QAOje2Flllk/ORlmQdFU/9c8z43eWh1RNMpI3PscY+yDCnJPBQ==';

    let txe = StellarBase.xdr.TransactionEnvelope.fromXDR(
      xdr,
      'base64'
    ).value();
    let sourceAccount = txe.tx().sourceAccountEd25519();

    expect(sourceAccount.length).to.be.equal(32);
    done();
  });

  it('calculates correct hash with non-utf8 strings', function(done) {
    // f0d17c040f51427fef80710d1ccd31a2b181eb47e529cb371f5670660427d6bd
    let xdr =
      'AAAAAAtjwtJadppTmm0NtAU99BFxXXfzPO1N/SqR43Z8aXqXAAAAZAAIj6YAAAACAAAAAAAAAAEAAAAB0QAAAAAAAAEAAAAAAAAAAQAAAADLa6390PDAqg3qDLpshQxS+uVw3ytSgKRirQcInPWt1QAAAAAAAAAAA1Z+AAAAAAAAAAABfGl6lwAAAEBC655+8Izq54MIZrXTVF/E1ycHgQWpVcBD+LFkuOjjJd995u/7wM8sFqQqambL0/ME2FTOtxMO65B9i3eAIu4P';
    var tx = new StellarBase.Transaction(xdr, StellarBase.Networks.PUBLIC);
    expect(tx.hash().toString('hex')).to.be.equal(
      'f0d17c040f51427fef80710d1ccd31a2b181eb47e529cb371f5670660427d6bd'
    );
    done();
  });
});
