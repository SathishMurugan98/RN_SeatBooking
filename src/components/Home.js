/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View, Text,
    TouchableOpacity,
    StyleSheet, Image,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {
    const logOut = () => {
        AsyncStorage.setItem('@login_check', 'failed');
        navigation.navigate('login');
    };
    return (
        <View style={styles.container}>
            <View style={[styles.headerContainer, styles.elevation]}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image style={styles.logo}
                        source={require('../assets/astralogo.png')} />
                    <View style={{ position: 'absolute', right: 60, margin: 'auto' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('alerts')}>
                            <Ionic name="notifications-circle-outline" size={40} color="#8c8c8c" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', right: 0, margin: 'auto' }}>
                        <TouchableOpacity onPress={() => logOut()}>
                            <Material name="logout" size={40} color="#ac3939" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <TouchableOpacity onPress={() => navigation.navigate('seatbook')}>
                        <Image
                            style={styles.cards}
                            source={require('../assets/Book_seat.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('reschedule')}>
                        <Image
                            style={styles.cards}
                            source={require('../assets/RescheduleBooking.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('cancel')}>
                        <Image
                            style={styles.cards}
                            source={require('../assets/CancelBooking.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('seeall')}>
                        <Image
                            style={styles.cards}
                            source={require('../assets/SeeAllBooking.png')} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C6C6C6',
    },
    elevation: {
        elevation: 10,
        shadowColor: '#d4d4d4',
    },
    headerContainer: {
        width: '100%',
        height: 60,
        padding: 10,
        backgroundColor: '#FFF',
    },
    logo: {
        marginLeft: -20,
        marginTop: -7,
        width: 250,
        height: 60,
    },
    cards: {
        marginTop: 20,
        width: 370,
        height: 150,
    },
});