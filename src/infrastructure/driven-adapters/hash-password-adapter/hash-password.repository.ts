import bcrypt from 'bcrypt';

export class HashRepository {

    async hash(password: string) {
        const hash = await bcrypt.hash(password, 10);
        console.log(hash);
        return hash;
    }

    async verify(){

    }

}

// const encriptar = new HashRepository()
// console.log(encriptar.hash('david12345s'))
