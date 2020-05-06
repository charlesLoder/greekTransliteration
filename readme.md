# greekTransliteration

A web app that transliterates Greek text according to SBL guidelines using the `greek-transliteration` [package](https://www.npmjs.com/package/greek-transliteration).

# install

## setup

You will need `node` and `npm` installed.

Download or clone this repository. Then

```bash
cd greekTransliteration
npm install
npm run build
```

This is just a local instillation of the site. If you are interested in improving the transliteration, please contribute to the `greek-transliteration` [package](https://www.npmjs.com/package/greek-transliteration).

## notes

This site was built using `spike` which is no longer maintained. The `package-lock.json` is not committed with the repository because:

1. since `spike` is no maintained, many of its dependencies are out of date have security issues
2. being a simple static site, I'm not too concerned about security issues
3. I was tired of getting GitHub notifications about dependencies being vulnerable

# live

Use the site live at [charlesLoder.github.io/greekTransliteration](https://charlesLoder.github.io/greekTransliteration)

## License

See [License](./license.md) for rights and limitations (MIT)
