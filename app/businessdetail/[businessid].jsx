import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import {db} from './../../Config/FirebaseConfigs'
import { doc, getDoc, query } from 'firebase/firestore'
import { Colors } from '@/constants/Colors'
import Intro from './../../components/BusinessDetail/Intro'
import ActionButton from '../../components/BusinessDetail/ActionButton'
import About from '../../components/BusinessDetail/About'
import Reviews from '../../components/BusinessDetail/Reviews'

export default function BusinessDetail() {

    const {businessid}=useLocalSearchParams();
    const [business,setBusiness]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        GetBusinessDetailById();
    },[])

    const GetBusinessDetailById=async()=>{
        setLoading(true);
        const docRef=doc(db,'BusinessList',businessid);
        const docSnap=await getDoc(docRef);

       if (docSnap.exists()){
        // console.log("Document data:",docSnap.data());
        setBusiness({id:docSnap.id,...docSnap.data()});
        setLoading(false)
       }else{
        console.log("No such document!")
        setLoading(false)
       }
    
    }

  return (
    <View>
        {loading? 
        <ActivityIndicator
        style={{marginTop:'70%'}}
        size={'large'} color={Colors.PRIMARY}
        />:
            <ScrollView>
                <Intro business={business}/>
                <ActionButton business={business}/>
                <About business={business}/>
                <Reviews business={business}/>
            </ScrollView>
        }
    </View>
    // </ScrollView>
  )
}