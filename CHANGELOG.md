## v3.0.0 (2025-11-17)

### Breaking Change

- some common config have been moved to plugin config
- config manager init params have been changed

### Bug Fix

- main
  - bad type for plugin init config param ([580c44b](https://github.com/folltoshe/music-lyric-kit/commit/580c44b))
- shared
  - bad type for update plugin config param ([fd870f3](https://github.com/folltoshe/music-lyric-kit/commit/fd870f3))
  - config manager can not get common config ([f37d729](https://github.com/folltoshe/music-lyric-kit/commit/f37d729))
- plugin init config param not optional ([3e22555](https://github.com/folltoshe/music-lyric-kit/commit/3e22555))

### Code Refactor

- shared
  - parser and builder ([43bb8e6](https://github.com/folltoshe/music-lyric-kit/commit/43bb8e6))
- config manager and config type ([c0291c5](https://github.com/folltoshe/music-lyric-kit/commit/c0291c5))

## v2.2.1 (2025-11-13)

### Document

- update readme ([357785e](https://github.com/folltoshe/music-lyric-kit/commit/357785e))

### Feature

- shared
  - add extended line type constant ([ca58f39](https://github.com/folltoshe/music-lyric-kit/commit/ca58f39))
- line type use constant in extended line result ([337d318](https://github.com/folltoshe/music-lyric-kit/commit/337d318))

### Bug Fix

- shared
  - config manager returned bad result when key is empty ([4ba56a2](https://github.com/folltoshe/music-lyric-kit/commit/4ba56a2))

### Code Refactor

- shared
  - parser processor code ([498b168](https://github.com/folltoshe/music-lyric-kit/commit/498b168))

## v2.2.0 (2025-11-09)

### Breaking Change

- group field is no longer required in result

### Feature

- update group field type in result ([d806502](https://github.com/folltoshe/music-lyric-kit/commit/d806502))

### Bug Fix

- plugin-ttml
  - extended lyric not add to result ([2917fff](https://github.com/folltoshe/music-lyric-kit/commit/2917fff))

## v2.1.0 (2025-11-09)

### Breaking Change

- meta value type have been changed
- the **dynamic** field in the result has been moved to **words** field
- the **dynamic** and **original** fields have been moved to the *main* field in config
- parser line config have been changed

### Feature

- plugin-ttml
  - add background lyric parse ([0796c0a](https://github.com/folltoshe/music-lyric-kit/commit/0796c0a))
- shared
  - add common config get for config manager ([5dd8637](https://github.com/folltoshe/music-lyric-kit/commit/5dd8637))
  - add util tools to insert space in words ([fd7b422](https://github.com/folltoshe/music-lyric-kit/commit/fd7b422))
- support multiple same meta key ([bece23a](https://github.com/folltoshe/music-lyric-kit/commit/bece23a))
- add background lyric type ([3604c53](https://github.com/folltoshe/music-lyric-kit/commit/3604c53))

### Bug Fix

- insert space of background lyric line did not work ([060f6f6](https://github.com/folltoshe/music-lyric-kit/commit/060f6f6))

### Code Refactor

- shared
  - lyric types and constants ([bb83be6](https://github.com/folltoshe/music-lyric-kit/commit/bb83be6))
- background lyric line type ([d63ae26](https://github.com/folltoshe/music-lyric-kit/commit/d63ae26))
- directory structure ([6ebaebe](https://github.com/folltoshe/music-lyric-kit/commit/6ebaebe))
- dynamic lyric ([98547e4](https://github.com/folltoshe/music-lyric-kit/commit/98547e4))
- insert space ([2e7ff27](https://github.com/folltoshe/music-lyric-kit/commit/2e7ff27))
- config ([bfdece9](https://github.com/folltoshe/music-lyric-kit/commit/bfdece9))

## v2.0.2 (2025-11-06)

### Bug Fix

- plugin-lrc
  - content not insert valid space when dynamic lyric is valid ([35bb92a](https://github.com/folltoshe/music-lyric-kit/commit/35bb92a))
- shared
  - config manager return bad config when get some config ([30c57fb](https://github.com/folltoshe/music-lyric-kit/commit/30c57fb))
- the cleanup of some first line lyric did not work ([f6da2f9](https://github.com/folltoshe/music-lyric-kit/commit/f6da2f9))
- inside symbol content not trimmed when insert space ([dc36977](https://github.com/folltoshe/music-lyric-kit/commit/dc36977))
- an abnormal character occurred when insert space ([fe472dc](https://github.com/folltoshe/music-lyric-kit/commit/fe472dc))

## v2.0.1 (2025-11-03)

### Bug Fix

- regex not work in some env ([9630573](https://github.com/folltoshe/music-lyric-kit/commit/9630573))
- package not export in some env ([5d48ed3](https://github.com/folltoshe/music-lyric-kit/commit/5d48ed3))

## v2.0.0 (2025-11-02)

### Breaking Change

- parser and builder init params have been changed
- update plugin config and common config interface have been changed
- export modules have been changed
- writer have been rename to builder
- exporter have been change to writer

### Document

- update readme ([ea8758e](https://github.com/folltoshe/music-lyric-kit/commit/ea8758e))
- update readme ([c167df9](https://github.com/folltoshe/music-lyric-kit/commit/c167df9))

### Feature

- core
  - support set common config ([a3fbe54](https://github.com/folltoshe/music-lyric-kit/commit/a3fbe54))
  - add ttml plugin ([ee46972](https://github.com/folltoshe/music-lyric-kit/commit/ee46972))
- plugin-ttml
  - add lyric group count calculation ([77fd925](https://github.com/folltoshe/music-lyric-kit/commit/77fd925))
  - add parse extended lyric ([caea474](https://github.com/folltoshe/music-lyric-kit/commit/caea474))
  - add parser for amll format ([2f47fc7](https://github.com/folltoshe/music-lyric-kit/commit/2f47fc7))
- shared
  - update default match rules ([c659db1](https://github.com/folltoshe/music-lyric-kit/commit/c659db1))
  - remove process single quote when insert space ([ed8c97f](https://github.com/folltoshe/music-lyric-kit/commit/ed8c97f))
  - add cjk quote support when insert space ([c1210fa](https://github.com/folltoshe/music-lyric-kit/commit/c1210fa))
  - remove process some symbol when insert space ([4f78673](https://github.com/folltoshe/music-lyric-kit/commit/4f78673))
  - optimize the effect in some symbols when insert space ([88b4c9f](https://github.com/folltoshe/music-lyric-kit/commit/88b4c9f))
  - update default match producer rules ([fcc1c87](https://github.com/folltoshe/music-lyric-kit/commit/fcc1c87))
  - update default match rules ([f754c37](https://github.com/folltoshe/music-lyric-kit/commit/f754c37))
- test
  - support parse ttml ([cce1456](https://github.com/folltoshe/music-lyric-kit/commit/cce1456))
- change update config interface ([314ce3c](https://github.com/folltoshe/music-lyric-kit/commit/314ce3c))
- change export modules ([41ba0a3](https://github.com/folltoshe/music-lyric-kit/commit/41ba0a3))
- rename writer to builder ([72bb124](https://github.com/folltoshe/music-lyric-kit/commit/72bb124))
- rename exporter to writer ([44ee14f](https://github.com/folltoshe/music-lyric-kit/commit/44ee14f))

### Bug Fix

- test
  - params error ([62a6093](https://github.com/folltoshe/music-lyric-kit/commit/62a6093))
- is instrumental music check ([e5d661f](https://github.com/folltoshe/music-lyric-kit/commit/e5d661f))

### Code Refactor

- insert duet and lyric group count calculation ([a4428a1](https://github.com/folltoshe/music-lyric-kit/commit/a4428a1))
- directory structure ([e18dbc9](https://github.com/folltoshe/music-lyric-kit/commit/e18dbc9))
- insert space util tools ([d0205d1](https://github.com/folltoshe/music-lyric-kit/commit/d0205d1))

## v1.2.0 (2025-10-30)

### Breaking Change

- modify the accepted parameters of the parse function
- export lyric types have been changed
- parser and exporter plugin interfaces have been changed

### Feature

- core
  - add common tools and types export ([1ded9d3](https://github.com/folltoshe/music-lyric-kit/commit/1ded9d3))
- plugin-lrc
  - add export lyric ([f36a5b4](https://github.com/folltoshe/music-lyric-kit/commit/f36a5b4))
  - change parse params ([99d1560](https://github.com/folltoshe/music-lyric-kit/commit/99d1560))
- shared
  - update default match producer rules ([1f9e09c](https://github.com/folltoshe/music-lyric-kit/commit/1f9e09c))
  - add time tools ([8ccb697](https://github.com/folltoshe/music-lyric-kit/commit/8ccb697))
  - optimize base plugin type ([8e71562](https://github.com/folltoshe/music-lyric-kit/commit/8e71562))
  - optimize utils tools ([f04f340](https://github.com/folltoshe/music-lyric-kit/commit/f04f340))

### Code Refactor

- shared
  - directory structure ([798a404](https://github.com/folltoshe/music-lyric-kit/commit/798a404))
- config manager ([a94ebd2](https://github.com/folltoshe/music-lyric-kit/commit/a94ebd2))
- lyric types ([e2f66d4](https://github.com/folltoshe/music-lyric-kit/commit/e2f66d4))
- parser and exporter plugin framework ([112f7d5](https://github.com/folltoshe/music-lyric-kit/commit/112f7d5))

## v1.1.0 (2025-10-26)

### Feature

- shared
  - optimize match mode ([88ba7a0](https://github.com/folltoshe/music-lyric-kit/commit/88ba7a0))

### Code Refactor

- shared
  - options manager ([08e1aad](https://github.com/folltoshe/music-lyric-kit/commit/08e1aad))
- parser and exporter ([cc59dbb](https://github.com/folltoshe/music-lyric-kit/commit/cc59dbb))
- context ([027d2c6](https://github.com/folltoshe/music-lyric-kit/commit/027d2c6))

## v1.0.0 (2025-10-26)

### Document

- update readme ([8ab31c1](https://github.com/folltoshe/music-lyric-kit/commit/8ab31c1))

### Feature

- core
  - add lrc plugin ([bed8d23](https://github.com/folltoshe/music-lyric-kit/commit/bed8d23))
- plugin-lrc
  - add parser ([5be4a33](https://github.com/folltoshe/music-lyric-kit/commit/5be4a33))
- shared
  - support update common and plugin options ([29eefc5](https://github.com/folltoshe/music-lyric-kit/commit/29eefc5))
  - update default match producer rules ([75756b9](https://github.com/folltoshe/music-lyric-kit/commit/75756b9))
  - add duet processor ([67780f2](https://github.com/folltoshe/music-lyric-kit/commit/67780f2))
  - add common processor ([6381e9c](https://github.com/folltoshe/music-lyric-kit/commit/6381e9c))
  - update lyric info type ([0044d39](https://github.com/folltoshe/music-lyric-kit/commit/0044d39))
  - update base plugin type ([0a000f3](https://github.com/folltoshe/music-lyric-kit/commit/0a000f3))
  - remove freeze empty info ([ecfa4ef](https://github.com/folltoshe/music-lyric-kit/commit/ecfa4ef))
  - remove freeze default options ([d86f79d](https://github.com/folltoshe/music-lyric-kit/commit/d86f79d))
  - add meta tag options ([715eb55](https://github.com/folltoshe/music-lyric-kit/commit/715eb55))
  - add common options ([215797d](https://github.com/folltoshe/music-lyric-kit/commit/215797d))
  - add constants ([465e7f9](https://github.com/folltoshe/music-lyric-kit/commit/465e7f9))
  - add utils ([d5b437a](https://github.com/folltoshe/music-lyric-kit/commit/d5b437a))
  - add types ([a4f09c9](https://github.com/folltoshe/music-lyric-kit/commit/a4f09c9))
- test
  - change parser to core ([d3e3c94](https://github.com/folltoshe/music-lyric-kit/commit/d3e3c94))
  - support parse lrc ([40ab7d8](https://github.com/folltoshe/music-lyric-kit/commit/40ab7d8))

### Bug Fix

- shared
  - base plugin not export ([0d798f2](https://github.com/folltoshe/music-lyric-kit/commit/0d798f2))
- build error ([d2e1d1e](https://github.com/folltoshe/music-lyric-kit/commit/d2e1d1e))
