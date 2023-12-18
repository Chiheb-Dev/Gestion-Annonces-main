import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth :Auth) { }


  async registeruser({email,password}){
    try {
      const user =await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
        );
        return user

    }catch(e){
      return e;
    }
  }
  async login({email,password}){
    try {
      const user =await signInWithEmailAndPassword (
        this.auth,
        email,
        password
        );
      localStorage.setItem('currentUser', JSON.stringify(user.user));
      return user

    }catch(e){
      return e;
    }

  }
  signout(){
    localStorage.removeItem('currentUser');
    return signOut(this.auth)
  }
  currentUser(){
    return this.auth.currentUser
  }

}
