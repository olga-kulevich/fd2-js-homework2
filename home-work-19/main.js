import States from './states.js';

const states = new States({
    name: 'maksim',
    age: '25'
});

pringState();

states.push({
    name: 'dima'
});

pringState();

states.push({
    age: '55'
});

pringState();

states.undo();

pringState();

function pringState() {
    console.log();
    console.log('====================');

    console.log('name:', states.get('name'));
    console.log('age:', states.get('age'));
}

