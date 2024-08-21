import { View, Text, FlatList, TouchableOpacity, Share, Image } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-react'

export default function MenuList() {

    const { signOut } = useAuth();
    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: require('./../../assets/images/add.png'),
            path: '/business/add-business'
        },
        {
            id: 2,
            name: 'My App',
            icon: require('./../../assets/images/app.png'),
            path: '/business/my-business'
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('./../../assets/images/shared-folder.png'),
            path: 'Share'
        },
        {
            id: 4,
            name: 'Log Out',
            icon: require('./../../assets/images/logout.png'),
            path: 'logout'
        }
    ]
    const router = useRouter();
    const onMenuClick = (item) => {
        if (item.path == 'logout') {
            signOut();
            return;
        }
        if (item.path == 'Share') {
            Share.share({
                message: 'Download the Business Directory App'
            })
            return;
        }
        router.push(item.path)
    }
    return (
        <TouchableOpacity
            // onPress={() => onMenuClick(item)}
            style={{ marginTop: 50 }}>
            <FlatList
                data={menuList}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                    onPress={() => onMenuClick(item)}
                        style={{
                        display: 'flex', flexDirection: 'row',
                        gap: 10, alignItems: 'center', flex: 1,
                        borderRadius: 15, borderWidth: 1, margin: 10,
                        borderColor: Colors.PRIMARY, backgroundColor: '#fff'
                    }}>
                        <Image source={item.icon}
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            flex: 1,
                            fontSize: 16
                        }}>{item.name}</Text>

                    </TouchableOpacity>
                )}
            />
            <Text style={{
                fontFamily: 'outfit',
                marginTop: 50, textAlign: 'center', color: Colors.GRAY
            }}>Developed by App</Text>
        </TouchableOpacity>
    )
}