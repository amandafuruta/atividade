import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from './firebaseConfig';


export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function loginFirebase() {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((user:any) => {
        console.log(email + '-' + senha);
        //console.log("loginFirebase user.uid=" + user.uid);
        // ...
      })
      .catch((error:any) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + errorMessage);
        console.log("loginFirebase=" + errorCode + "/" + errorMessage);
      });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user:any) {
      if (user) {
        console.log("useEffect user.uid=" + user.uid);
        console.log('Usuário conectado');
      } else {
        console.log("useEffect=Usuário não logado");
      }
    });
  }, []);

  function logoutFirebase() {
    firebase.auth().signOut().then(function () {
      console.log("logoutFirebase=Usuário desconectado com sucesso")
    }).catch(function (error:any) {
      console.log("logoutFirebase=Falha ao desconectar");
    });
  }

  function createUserFirebase() {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((use:any) => {
        console.log("createUserFirebase=Usuário criado com sucesso");
      })
      .catch((error:any) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("createUserFirebase=Falha ao desconectar")
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Firebase Login</Text>
      <TextInput style={styles.input} placeholder="Digite seu e-mail"
        onChangeText={email => setEmail(email)} value={email}
      />
      <TextInput style={styles.input} placeholder="Digite sua senha"
        onChangeText={senha => setSenha(senha)} value={senha} secureTextEntry={true} 
      />
      <Text>{email}</Text>

      <TouchableOpacity style={styles.button} onPress={() => { loginFirebase() }}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => { logoutFirebase() }}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => { createUserFirebase() }}>
        <Text>Create user</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "red",
    fontSize: 15
  },
  input: {
    width: 250,
    height: 60,
    borderWidth: 1,
    borderColor: "red",
    marginTop: 10,
    paddingLeft: 10
  },
  button: {
    width: 250,
    height: 60,
    borderWidth: 1,
    borderColor: "red",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});
