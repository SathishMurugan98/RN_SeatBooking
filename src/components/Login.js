/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    TextInput,
    Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const loginCheck = () => {
        setMessage('');
        console.log(loginId, '------->', password);
        if (loginId.length !== 0 && password.length !== 0) {
            // if (loginId === 'admin' && password === 'admin') {
            //     AsyncStorage.setItem('@login_check', 'success');
            //     console.log('Login Successfully.....');
            //     navigation.replace('home');
            // } else {
            //     setMessage('Check your credentials.');
            // }
            axios({ method: 'POST', url: '/api/login' })
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        // AsyncStorage.setItem('@login_check', 'success');
                        console.log('Login Successfully.....');
                        // navigation.navigate('home');
                    }
                })
                .catch((error) => {
                    console.log('Error=====> ', error);
                });
        } else {
            setMessage('Required All Filed.');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                resizeMode="cover"
                source={require('../assets/office.jpg')}
                style={styles.container}>
                <View style={styles.model}>
                    <Image
                        source={require('../assets/astralogo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.header}>Seat Booking Portal</Text>

                    <View>
                        <Text style={{ color: 'red', fontSize: 18, marginTop: 10, marginBottom: -20 }}>{message}</Text>
                        <TextInput
                            placeholder="Login ID*"
                            value={loginId}
                            style={styles.textfiled}
                            onChangeText={(text) => setLoginId(text)}
                        />

                        <TextInput
                            placeholder="Password*"
                            secureTextEntry={true}
                            value={password}
                            style={styles.textfiled}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => loginCheck()}
                            style={styles.loginBtn}
                        >
                            <Text style={styles.btnText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    model: {
        width: 330,
        height: 500,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
    },
    logo: {
        marginLeft: -20,
        width: 250,
        height: 60,
    },
    header: {
        fontSize: 24,
        color: 'gray',
    },
    textfiled: {
        width: 300,
        height: 50,
        fontSize: 18,
        marginTop: 25,
        color: '#666666',
        borderBottomWidth: 3,
        fontWeight: '700',
        borderColor: 'gray',
    },
    loginBtn: {
        width: 300,
        height: 55,
        fontSize: 18,
        marginTop: 100,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#006287',
    },
    btnText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 21,
        fontWeight: 'bold',
    },
});
