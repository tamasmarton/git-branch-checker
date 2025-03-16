# Git Branch Checker

![Build Status](https://github.com/tamasmarton/git-branch-checker/actions/workflows/publish.yml/badge.svg)
![npm version](https://img.shields.io/npm/v/@tamasmarton/git-branch-checker)
![License](https://img.shields.io/badge/license-MIT-blue)
![Static Badge](https://img.shields.io/badge/dependency-zero-purple)


Git Branch Checker is an npm package that helps you manage and enforce branch naming conventions in your Git repositories.

## Installation

To install the package, run:

```bash
npm install git-branch-checker
```

## Usage

You can use Git Branch Checker as a CLI tool or as a library in your Node.js project.

### CLI

To use the CLI, run the following command in your terminal:

```bash
npx git-branch-checker
```

### Node.js Library

To use the package in your Node.js project, import it and call the necessary functions:

```javascript
const gitBranchChecker = require('git-branch-checker');

gitBranchChecker.checkBranchName();
```

## Configuration

You can configure Git Branch Checker by creating a `.gitbranchcheckerrc` file in the root of your repository. The configuration file should be in JSON format and can include the following options:

```json
{
    "pattern": "feature/*|bugfix/*|hotfix/*",
    "errorMessage": "Branch name does not follow the naming convention."
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact the maintainer at [hello@tamasmarton.com](mailto:hello@tamasmarton.com).
