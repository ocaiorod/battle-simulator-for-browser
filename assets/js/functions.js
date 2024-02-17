const defaultCharacter = {
    nname: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

const createSquirtle = () => {
    return {
        ...defaultCharacter,
        name: 'Squirtle',
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 5,
        element: 'water'
    }
}

const createBulbasaur = () => {
    return {
        ...defaultCharacter,
        name: 'Bulbasaur',
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 5,
        element: 'grass'
    }
}

const createCharmander = () => {
    return {
        ...defaultCharacter,
        name: 'Charmander',
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 5,
        element: 'fire'
    }
}

const createPikachu = () => {
    return {
        ...defaultCharacter,
        name: 'Pikachu',
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 5,
        element: 'electro'
    }
}

const stage = {
   fighter1: null,
   fighter2: null,
   fighter1El: null,
   fighter2El: null,
   
   start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

        this.update(); 
    },
    update() {
        // Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`
        // Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    },
    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
            log.addMessage('Alguém está morto e não pode atacar!')
            return;
        }

        const attackFactor = (Math.random() *2).toFixed(2);
        const defenseFactor = (Math.random() *2).toFixed(2);
        
        // Teste
        if(attacking.element == 'water' && attacked.element == 'fire') {
            const attackFactor = (Math.random() *3).toFixed(2);
            const defenseFactor = (Math.random() *1).toFixed(2);
        } else { 
            const attackFactor = (Math.random() *2).toFixed(2);
            const defenseFactor = (Math.random() *2).toFixed(2);
        }

        if(attacking.element == 'fire' && attacked.element == 'water') {
            const attackFactor = (Math.random() *1).toFixed(2);
            const defenseFactor = (Math.random() *3).toFixed(2);
        } else { 
            const attackFactor = (Math.random() *2).toFixed(2);
            const defenseFactor = (Math.random() *2).toFixed(2);
        }
        // Teste

        const actualAttack = attacking.attack * attackFactor;
        const actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            attacked.life = attacked.life < 0 ? 0 : attacked.life;
            if(actualAttack >= 14) {
                log.addMessage(`${attacking.name} acertou um ataque superefetivo de ${actualAttack.toFixed(1)} de dano!`) 
            } else {
                log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(1)} de dano em ${attacked.name}.`)
            }
        } else {
            log.addMessage(`${attacked.name} conseguiu defender...`)
        }

        this.update();
    }
}

const log = {
    list: [],
    addMessage(msg) {
        this.list.push(msg);
        this.render();
    },
    render() {
        const logEl = document.querySelector('.log');
        logEl.innerHTML ='';

        for(let i in this.list) {
            logEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}