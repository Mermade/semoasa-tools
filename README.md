# semoasa-combine

Combine multiple [Semoasa](https://github.com/RepreZen/Semoasa) documents into one

## Use-case

Bundling multiple Semoasa documents into a combined document for use in Semoasa-compliant
applications.

## Usage:

```
semoasa [file...] > output.yaml
```

## Notes

The output Semoasa version number (`openapiExtensionFormat`) will be set to the highest version seen in the input files, according
to [semver](http://semver.org/). No attempt is *currently* made to validate or ugrade earlier versions to the latest version.

Clashing definitions in later input files will be **merged** with those in earlier files. Precedence is important.
