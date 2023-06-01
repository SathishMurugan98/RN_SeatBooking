/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View, Text,
    TouchableOpacity,
    StyleSheet, Image,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import Ionic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

const SeeAllHistory = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const dropDown = [
        {
            label: 'Today',
            value: 'today',
        },
        {
            label: 'Weekly',
            value: 'weekly',
        },
        {
            label: 'Monthly',
            value: 'monthly',
        },
        {
            label: 'AllTime',
            value: 'alltime',
        },
    ]
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const [loading, setLoading] = useState(false);
    const [dropName, setDropName] = useState("today");

    const changeDropdown = (value, id) => {
        setMessage('');
        setDropName(value);
        console.log("===>", value);
    };

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

            <View style={{ padding: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 23, marginRight: 10 }}>All Bookings</Text>
                <DropDownPicker
                    items={[
                        { label: 'Item 1', value: 'item1' },
                        { label: 'Item 2', value: 'item2' },
                    ]}
                    defaultValue="item1"
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => console.log(item.label, item.value)}
                />
            </View>
        </View>
    );
};

export default SeeAllHistory;

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
    dropdown_style: {
        width: 170,
        borderRadius: 10,
        borderColor: '#595959',
    },
});
