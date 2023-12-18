# Lines count

This might be useful if you're paid per line.

## Usage guidelines

The script was created keeping with Next.JS and Next.JS in mind only, so if you're using it with any other framework or language, don't forget to exclude your project's dependecy and build files, images and other non-code files from the final count.

## Exclusion of folders, files and patterns

Open [count-lines.js](https://github.com/losbiw/count-lines/blob/master/count-lines.js#L4), proceed to the line number 4 where the "defaultExcluded" array is defined. The further instructions depend on your particular use case:

- If you are trying to exclude a specific path (e.g. a file or a directory), add it to the array as a string. For example, if one was to exclude the "node_modules" directory, they would do something like this:

```
const defaultExcluded = [
	"node_modules",
	// other files
]
```

- On the other hand, if one wanted to exclude all files that fell under the same category (e.g. all ".png" or "dot" files, etc.), they shall add a regex expression to the array mentioned above. Examples:

  1. Regex that matches all png files

  ```
  /\/.png/
  ```

  2. Regex that matches all dot files, e.g. .gitignore, .env, .babelrc, etc.

  ```
  /^\./
  ```
