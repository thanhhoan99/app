import { View, Text ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import CategoryItem from './CategoryItem'
import {db} from './../../Config/FirebaseConfigs'
import { collection, getDocs, query } from 'firebase/firestore'
import { useRouter } from 'expo-router'


export default function Category({explore=false,onCategorySelect}) {

  const [categoryList,setCategoryList]=useState([]);
  const router=useRouter();
    useEffect(()=>{
        GetCategoryList();
    },[]);

    const GetCategoryList=async()=>{
        setCategoryList([]);
        const q=query(collection(db,'Category'));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev,doc.data()])
        })
    }
    const onCategoryPressHandler=(item)=>{
      if(!explore){
        router.push('/businesslist/'+item.name)
      }else{
        onCategorySelect(item.name)
      }
    }
  return (
    <View>
       {!explore &&  <View style={{
            display:'flex',
            flexDirection:'row',
            marginTop:10,  
            padding:20,
            justifyContent:'space-between'
      }}>
        <Text style={{
                fontFamily:'outfit-bold',
                fontSize:20,
                          
      }}>   Category 
        </Text>
        <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-medium'}}>View All</Text>
        </View>}
        <FlatList
        data={categoryList}
        horizontal={true}
        style={{paddingLeft:20}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <CategoryItem category={item} key={index}
                           onCategoryPress={(category)=> onCategoryPressHandler(item)
                            // router.push('/businesslist/'+item.name)
                            }
                        //    onCategoryPress={({category}) => {
                        //     console.log('Navigating to:', './businesslist/' + item.name);
                        //     router.push('./businesslist/' + item.name);
                        // }}
                        
                />
        )}
    />
    </View>
  )
}