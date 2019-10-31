const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');

/* /(ROOT_PATH)/react-dialogs-managers/ */
const RDM_DIR_PATH = path.resolve(__dirname, '../') + '/';
const README_FILE = RDM_DIR_PATH + 'README.md';

/* input files*/
const inputFiles = [
	RDM_DIR_PATH + 'src/index.js', 
	RDM_DIR_PATH + 'src/dialogManager/DialogManager.js', 
	RDM_DIR_PATH + 'src/dialogManager/dialog/Dialog.js'
];


/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({
	files: inputFiles,
	//'no-cache': true
});

templateData.sort((a, b) => {
	if(b.kind == 'module') return 1; 
	if(b.kind == 'class') return 0; 
	return (a.name > b.name)? 1: -1;
});

const api = jsdoc2md.renderSync({
	'data': templateData,
	'heading-depth': 3,
	//'partial': 'hbs/*.hbs',
	'partial': path.resolve(__dirname, './hbs/*.hbs'),
	//'template': `hey {{>main}}`,
	'global-index-format': 'grouped',
	'param-list-format': 'list',
	'property-list-format': 'list',
	//'name-format': 'backticks',
	'separators': '***',
	'member-index-format': 'list'
});

const overview = fs.readFileSync( path.resolve(__dirname, './sections/overview.md') );
const installation = fs.readFileSync( path.resolve(__dirname, './sections/installation.md') );
const getting_started = fs.readFileSync( path.resolve(__dirname, './sections/getting_started.md') );
const examples = fs.readFileSync( path.resolve(__dirname, './sections/examples.md') );
const contribution = fs.readFileSync( path.resolve(__dirname, './sections/contribution.md') );
const todo = fs.readFileSync( path.resolve(__dirname, './sections/todo.md') );

const output = 
`${overview}

${installation}

${getting_started}

${examples}

## API 
${api}

${todo}

${contribution}
`;

fs.writeFileSync(README_FILE, output);


console.log('readme file generated');