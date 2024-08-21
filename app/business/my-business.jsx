import { View, Text,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import {db, storage} from '../../Config/FirebaseConfigs'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors'
import { useUser } from '@clerk/clerk-react';
import BusinessListCard from './../../components/BusinessList/BusinessListCard'

export default function MyBusiness() {

    const {user}=useUser();
    const [businessList,setBusinessList]=useState([]);
    const [loading,setLoading]=useState(false);
    const navigation=useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown:true,
            headerTitle:'My Business',
            headerStyle:{
                backgroundColor:Colors.PRIMARY
            }
        });
        user&&GetUserBusiness()
    }, [user]);

    const GetUserBusiness=async()=>{
        setLoading(true);
        setBusinessList([]);
        const q=query(collection(db,'BusinessList'),
        where('userEmail','==',user?.primaryEmailAddress?.emailAddress));
        const querySnapshpt=await getDocs(q);

        querySnapshpt.forEach((doc)=>{
            console.log(doc.data())
            setBusinessList(prev=>[...prev,{id:doc?.id, ...doc.data()}])
       
    })
    setLoading(false);
}


  return (
    <View  style={{
        padding:20
    }}>
      {/* <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>my-business</Text> */}

        <FlatList
            onRefresh={GetUserBusiness}
            refreshing={loading}
            data={businessList}
            renderItem={({item,index})=>(
                <BusinessListCard business={item} key={index}/>
        )}
        
        />  
    </View>
  )
}