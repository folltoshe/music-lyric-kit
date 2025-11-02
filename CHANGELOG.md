## [2.0.1](https://github.com/folltoshe/music-lyric-kit/compare/v2.0.0...v2.0.1) (2025-11-02)


### Bug Fixes

* package not export in some env ([5d48ed3](https://github.com/folltoshe/music-lyric-kit/commit/5d48ed347c38a60306c50138044b80fcdec7a6f5))
* regex not work in some env ([9630573](https://github.com/folltoshe/music-lyric-kit/commit/96305734c90a55bf771791c7b1b0eb664bfba4b7))



# [2.0.0](https://github.com/folltoshe/music-lyric-kit/compare/v1.2.0...v2.0.0) (2025-11-02)


### Bug Fixes

* is instrumental music check ([e5d661f](https://github.com/folltoshe/music-lyric-kit/commit/e5d661f12f69abefc8a8875616e12ab559185651))
* **test:** params error ([62a6093](https://github.com/folltoshe/music-lyric-kit/commit/62a6093ee344dfed259286db7517a86c43243f23))


### Features

* change export modules ([41ba0a3](https://github.com/folltoshe/music-lyric-kit/commit/41ba0a3878561cb3a46c142795c736e678813b0a))
* change update config interface ([314ce3c](https://github.com/folltoshe/music-lyric-kit/commit/314ce3cb25c205a576125b143d8bd4f31b1b9e56))
* **core:** add ttml plugin ([ee46972](https://github.com/folltoshe/music-lyric-kit/commit/ee469720d58e3ef4452bfef6006b79af85a61470))
* **core:** support set common config ([a3fbe54](https://github.com/folltoshe/music-lyric-kit/commit/a3fbe546c6cb53b55eff2e4a0f4cb4046efbceca))
* **plugin-ttml:** add lyric group count calculation ([77fd925](https://github.com/folltoshe/music-lyric-kit/commit/77fd925c51119371e3faeb0abdba206727b9dc24))
* **plugin-ttml:** add parse extended lyric ([caea474](https://github.com/folltoshe/music-lyric-kit/commit/caea47474a61c75d7c5ab0aeae7407690431ab95))
* **plugin-ttml:** add parser for amll format ([2f47fc7](https://github.com/folltoshe/music-lyric-kit/commit/2f47fc763fb2d08702fbdae191a1ae16e051fb44))
* rename exporter to writer ([44ee14f](https://github.com/folltoshe/music-lyric-kit/commit/44ee14f828e29ba1fb39f05bb679aa477062fbc1))
* rename writer to builder ([72bb124](https://github.com/folltoshe/music-lyric-kit/commit/72bb124e42e6350f1615a66e48ef70c340faf7f7))
* **shared:** add cjk quote support when insert space ([c1210fa](https://github.com/folltoshe/music-lyric-kit/commit/c1210fabd1d3f4207acfd6706384cdbb4d1de8e0))
* **shared:** optimize the effect in some symbols when insert space ([88b4c9f](https://github.com/folltoshe/music-lyric-kit/commit/88b4c9fdac776286660339a98ae4af61aee4e746))
* **shared:** remove process single quote when insert space ([ed8c97f](https://github.com/folltoshe/music-lyric-kit/commit/ed8c97faaf6eb4bf87999efb82df26eb7e7fac49))
* **shared:** remove process some symbol when insert space ([4f78673](https://github.com/folltoshe/music-lyric-kit/commit/4f78673c5090f4426a10fd055674fc35fb4f301b))
* **shared:** update default match producer rules ([fcc1c87](https://github.com/folltoshe/music-lyric-kit/commit/fcc1c876a726d6a08dfdac62255e5f766f80b3bb))
* **shared:** update default match rules ([c659db1](https://github.com/folltoshe/music-lyric-kit/commit/c659db1465e3f7e174f508f161d15d5a5d7181dd))
* **shared:** update default match rules ([f754c37](https://github.com/folltoshe/music-lyric-kit/commit/f754c37bb09d941cba5adec21e6c75b14c0b94d2))
* **test:** support parse ttml ([cce1456](https://github.com/folltoshe/music-lyric-kit/commit/cce1456675f609176f3a68fd0cc4bfd9fb55f66a))


### Breaking Changes

* update plugin config and common config interface have been changed
* **core:** parser and builder init params have been changed
* export modules have been changed
* writer have been rename to builder
* exporter have been change to writer



# [1.2.0](https://github.com/folltoshe/music-lyric-kit/compare/v1.1.0...v1.2.0) (2025-10-29)


### Code Refactoring

* lyric types ([e2f66d4](https://github.com/folltoshe/music-lyric-kit/commit/e2f66d42c38e8299f5c77bb81dd084e6df0c1a4e))
* parser and exporter plugin framework ([112f7d5](https://github.com/folltoshe/music-lyric-kit/commit/112f7d5c33fe12d832a0e2bf805df9f0795329bc))


### Features

* **core:** add common tools and types export ([1ded9d3](https://github.com/folltoshe/music-lyric-kit/commit/1ded9d37b0989f9571a1862273ba8211765804a7))
* **plugin-lrc:** add export lyric ([f36a5b4](https://github.com/folltoshe/music-lyric-kit/commit/f36a5b4bca599d8e5954be445a0f306609f95fdd))
* **plugin-lrc:** change parse params ([99d1560](https://github.com/folltoshe/music-lyric-kit/commit/99d1560b6bab3af3c16d89fbbdc6ecc57ea7fca4))
* **shared:** add time tools ([8ccb697](https://github.com/folltoshe/music-lyric-kit/commit/8ccb697d6040a93d821c2e690bf75bcf1a4d16ef))
* **shared:** optimize base plugin type ([8e71562](https://github.com/folltoshe/music-lyric-kit/commit/8e7156243bf48b47ba3b97e2bc0ddb02b647addd))
* **shared:** optimize utils tools ([f04f340](https://github.com/folltoshe/music-lyric-kit/commit/f04f340fd71d476d14c6ade485e87bc9bf15ad3b))
* **shared:** update default match producer rules ([1f9e09c](https://github.com/folltoshe/music-lyric-kit/commit/1f9e09c2152381acfd47806569a68348ef38938f))


### Breaking Changes

* export lyric types have been changed
* parser and exporter plugin interfaces have been changed
* **plugin-lrc:** modify the accepted parameters of the parse function



# [1.1.0](https://github.com/folltoshe/music-lyric-kit/compare/v1.0.0...v1.1.0) (2025-10-26)


### Features

* **shared:** optimize match mode ([88ba7a0](https://github.com/folltoshe/music-lyric-kit/commit/88ba7a0bb15b7faa8ccf7e608a8c7fa0d6db0a8e))



# [1.0.0](https://github.com/folltoshe/music-lyric-kit/compare/a4f09c9610ca8262e712afca59d837d7a7a87d54...v1.0.0) (2025-10-25)


### Bug Fixes

* build error ([d2e1d1e](https://github.com/folltoshe/music-lyric-kit/commit/d2e1d1e3c529a9cb6f4f2ad4485c1ab693a4000f))
* **shared:** base plugin not export ([0d798f2](https://github.com/folltoshe/music-lyric-kit/commit/0d798f2c2ddb4d432dce60ee83bdf9aaad9ec373))


### Features

* **core:** add lrc plugin ([bed8d23](https://github.com/folltoshe/music-lyric-kit/commit/bed8d2316feefd2175840313efbea0e4d8c507c3))
* **plugin-lrc:** add parser ([5be4a33](https://github.com/folltoshe/music-lyric-kit/commit/5be4a33de5f01d942fdb6c9aed02be8c6ed9b366))
* **shared:** add common options ([215797d](https://github.com/folltoshe/music-lyric-kit/commit/215797d1389ab5b4cae38addd4330e8d94bce9fe))
* **shared:** add common processor ([6381e9c](https://github.com/folltoshe/music-lyric-kit/commit/6381e9c6e48df403a5bb58976b5e23ada2f3066d))
* **shared:** add constants ([465e7f9](https://github.com/folltoshe/music-lyric-kit/commit/465e7f9eb91646d612ba0a4547c0de1e61d04843))
* **shared:** add duet processor ([67780f2](https://github.com/folltoshe/music-lyric-kit/commit/67780f20b6039e392c677806ae5f67b0f70dec59))
* **shared:** add meta tag options ([715eb55](https://github.com/folltoshe/music-lyric-kit/commit/715eb55123787aa19a1ca64829448c91e4e6f10c))
* **shared:** add types ([a4f09c9](https://github.com/folltoshe/music-lyric-kit/commit/a4f09c9610ca8262e712afca59d837d7a7a87d54))
* **shared:** add utils ([d5b437a](https://github.com/folltoshe/music-lyric-kit/commit/d5b437a1d344c932356f7920c632af24ed3823f1))
* **shared:** remove freeze default options ([d86f79d](https://github.com/folltoshe/music-lyric-kit/commit/d86f79db51201bf6f27297677a13ad97cf923a7e))
* **shared:** remove freeze empty info ([ecfa4ef](https://github.com/folltoshe/music-lyric-kit/commit/ecfa4efb14848db381f466a028af571d7a390915))
* **shared:** support update common and plugin options ([29eefc5](https://github.com/folltoshe/music-lyric-kit/commit/29eefc562760811911b3567baeb2d3bdfcb9fbf0))
* **shared:** update base plugin type ([0a000f3](https://github.com/folltoshe/music-lyric-kit/commit/0a000f300f143d8c80613dc1bf44dd8fee9f13d7))
* **shared:** update default match producer rules ([75756b9](https://github.com/folltoshe/music-lyric-kit/commit/75756b9101df5d581b75886bb3dc90d8361fea18))
* **shared:** update lyric info type ([0044d39](https://github.com/folltoshe/music-lyric-kit/commit/0044d393b0cebb0d9246bddb7ac48983ac5e9fbc))
* **test:** change parser to core ([d3e3c94](https://github.com/folltoshe/music-lyric-kit/commit/d3e3c94e1d5c1b011077b3ffb541c4c062b335e8))
* **test:** support parse lrc ([40ab7d8](https://github.com/folltoshe/music-lyric-kit/commit/40ab7d867ae2e4bc8d0038f8bfe58c97ec8889a5))
