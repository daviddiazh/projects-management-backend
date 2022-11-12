import bcrypt from 'bcrypt';

export class HashRepository {

    async hash(password: string) {
        const hash = await bcrypt.hash(password, 10);
        console.log('hash - ADAPTER: ', hash);
        
        return hash;
    }

    async verify(password: string, encryptedPassword: string){
        const isMatch = await bcrypt.compare(password, encryptedPassword);
        console.log('isMatch - ADAPTER: ', isMatch)

        return isMatch;
    }

}
