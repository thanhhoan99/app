import { View, Text,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { limit } from 'firebase/firestore';
import {db} from './../../Config/FirebaseConfigs'
import { collection, getDocs, query } from 'firebase/firestore'
import PopularBusinessCard from './PopularBusinessCard'

export default function PopularBusiness() {

  const [businessList,setBusinessList]=useState([]);
  useEffect(()=>{
      GetBusinessList();
  },[]);

  const GetBusinessList=async()=>{
      setBusinessList([]);
      const q=query(collection(db,'BusinessList'),limit(10));
      const querySnapshot=await getDocs(q);

      querySnapshot.forEach((doc)=>{
          console.log(doc.data());
          setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
      })
  }

  return (
    <View>
         <View style={{
            display:'flex',
            flexDirection:'row',
            marginTop:20,
            marginBottom:10,  
            paddingLeft:20,
            justifyContent:'space-between'
      }}>
        <Text style={{
                fontFamily:'outfit-bold',
                fontSize:20,
                          
      }}>   Popular Business 
        </Text>
        <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-medium'}}>View All</Text>
        </View>
        <FlatList
        data={businessList}
        horizontal={true}
        // style={{paddingLeft:20}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <PopularBusinessCard business={item} key={index}/>
        )}
    
    />
      
    </View>
  )
}