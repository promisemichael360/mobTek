import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useState,useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {BellIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline"
import Categories from '../components/Categories'
import Recipes from '../components/Recipes'

export default function HomeScreen() {
  const [activeCat,setActiveCat]=useState(null)
  const [categories,setCategories]=useState([])
  const [meals,setMeals]=useState([])

const handleChangeCat=(categories)=>{
  getRecipe(categories)
  setActiveCat(categories)
  setMeals([])
}
  const getCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const api = await response.json();
      if(api&&api.categories){
        setCategories(api.categories)
      }
      console.log(api);
    } catch (error) {
      console.error(error);
    }
  };
  const getRecipe = async (categories="beef") => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`);
      const api = await response.json();
      console.log(api)
      if(api&&api.meals){
        setMeals(api.meals)
     }
      console.log(api);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategories();
    getRecipe()
  }, [])
  return (
    <View className="flex-1 bg-white">
        <StatusBar style="dark"/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:50}} className="space-y-6 pt-14">
        <View className="mx-4 flex-row justify-between items-center mb-2">
            <Image source={require("../assets/fun.jpg")} style={{width:hp(5.5),height:hp(5.5)}}/>
            <BellIcon size={hp(4)} color={"grey"}/>
        </View>
        <View className="mx-4 space-y-2 mb-2">
            <Text style={{fontSize:hp(1.7)}} className="text-neutral-600">Hello Mobtek</Text>
            <View>
              <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">Make Your Own Food</Text>
            </View>
            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">Stay at<Text className="text-amber-400"> Home</Text></Text>
            <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
              <TextInput placeholder='Search for recipe' placeholderTextColor={"grey"} style={{fontSize:hp(1.7)}} className="flex-1 text-base mb-1 pl-3 tracking tracking-wider"/>
              <View className="bg-white rounded-full p-3">
                <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} stroke={"grey"}/>
              </View>
            </View>
        </View>
        <View>
          {categories.length>0 &&<Categories categories={categories} activeCat={activeCat} handleChangeCat={handleChangeCat}/>}
        </View>
        <View>
          <Recipes meals={meals} categories={categories}/>
        </View>
      </ScrollView>
    </View>
  )
}