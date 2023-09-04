import scanner from 'sonarqube-scanner';
// const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: 'http://localhost:9000',
    login: 'admin',
    password: 'ahmad',
    options: {
      'sonar.sources': './src',
      'sonar.login': 'admin',
      'sonar.password': 'ahmad',
    },
  },
  () => process.exit()
);
