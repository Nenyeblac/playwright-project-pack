
export class CheckoutDataBuilder {

    private data = {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345'
    };

    withFirstName(firstname: string){
        this.data.firstName = firstname;
        return this;
    }

    withLastName(lastName: string){
        this.data.lastName = lastName;
        return this;
    }

    withPostalCode(postalCode: string){
        this.data.postalCode = postalCode;
        return this;
    }

    build(){
        return this.data;
    }
}