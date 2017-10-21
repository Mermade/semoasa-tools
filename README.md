# semoasa-tools

Tools for manipulating [Semoasa](https://github.com/RepreZen/Semoasa) documents.

## semoasa-combine

Combine multiple Semoasa documents into one.

### Use-case

Bundling multiple Semoasa documents into a combined document for use in Semoasa-
compliant applications.

### Usage:

```
semoasa [file...] > output.yaml
```

### Notes

The output Semoasa version number (`openapiExtensionFormat`) will be set to the highest version seen in the input files, according
to [semver](http://semver.org/). No attempt is *currently* made to validate or ugrade earlier versions to the latest version.

Clashing definitions in later input files will be **merged** with those in earlier files. Precedence is important.

## semoasa-split

### Use case

Splitting a bundled Semoasa document back into its component parts, based on namespace.

### Usage

`semoasa-split [file...]`

### Notes

Namespaces existing in multiple input files will overwrite the same output document(s).

## semoasa-validate

*Coming soon*

## semoasa-upgrade

*Coming soon*

