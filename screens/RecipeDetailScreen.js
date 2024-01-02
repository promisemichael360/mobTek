import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { themeColor } from '../theme';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/solid';
import Loading from '../components/loading';
import YoutubePlayer from "react-native-youtube-iframe";
import Animated, { FadeInDown, useSharedValue, withSpring,FadeIn } from 'react-native-reanimated';



export default function RecipeDetailScreen() {
  const { params } = useRoute();
  let item = params;
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMealData = async (id) => {
      try {
        const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const api = await response.json();
        console.log(api);
        if (api && api.meals) {
          setMeal(api.meals[0]);
          setLoading(false)
        }
      } catch (error) {
        console.error(error);
      }
    };

    getMealData(item.idMeal);
  },);
  const ingredientsFunc=(meal)=>{
    if (!meal) return[];
    let indexes=[];
    for (let i = 1; i <=20; i++) {
      if (meal["strIngredient"+i]) {
         indexes.push(i)
      }      
    }
    return indexes
  }
const getYoutubeVidoeId=url=>{
  const regex=/[?&]v=([^&]+)/
  const match=url.match(regex)
  if (match && match[1] ) {
    return match[1]
  }
  return null
}
  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <Animated.Image source={{ uri: `${item.strMealThumb}` }} sharedTransitionTag={item.strMeal} className="w-full h-72" style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} />
        <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
          <TouchableOpacity className="rounded-full ml-5 p-2 bg-white" onPress={() => navigation.navigate("Home")}>
            <ChevronLeftIcon strokeWidth={3} stroke={themeColor.bgColor(1)} />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full mr-5 p-2 bg-white" onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon strokeWidth={4.5} size={hp(3.5)} stroke={isFavourite ? 'red' : 'gray'} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
          <Text style={{fontSize:hp(3)}} className="font-bold flex-1 text-neutral-700">{meal?.strMeal}</Text>
          <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">{meal?.strArea}</Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
           <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{width:hp(6.5),height:hp(6.5)}} className="bg-white items-center flex justify-center rounded-full">
                 <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#FFBF00"}/>
              </View>
           
           <View className="flex items-center py-2 space-y-1">
              <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                35
              </Text>
              <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                Mins
              </Text>
           </View>
           </View>
           <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{width:hp(6.5),height:hp(6.5)}} className="bg-white items-center flex justify-center rounded-full">
                 <UserIcon size={hp(4)} strokeWidth={2.5} color={"#FFBF00"}/>
              </View>
           
           <View className="flex items-center py-2 space-y-1">
              <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                0.3
              </Text>
              <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                Servings
              </Text>
           </View>
           </View>
           <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{width:hp(6.5),height:hp(6.5)}} className="bg-white items-center flex justify-center rounded-full">
                 <FireIcon size={hp(4)} strokeWidth={2.5} color={"#FFBF00"}/>
              </View>
           
           <View className="flex items-center py-2 space-y-1">
              <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                103
              </Text>
              <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                Cal
              </Text>
           </View>
           </View>
           <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{width:hp(6.5),height:hp(6.5)}} className="bg-white items-center flex justify-center rounded-full">
                 <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={"#FFBF00"}/>
              </View>
           
           <View className="flex items-center py-2 space-y-1">
              <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                
              </Text>
              <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                Easy
              </Text>
           </View>
           </View>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
          <Text style={{fontSize:hp(1.5)}} className="font-bold flex-1 text-neutral-700">
            Ingredients
          </Text>
          <View className="space-y-2 ml-3">
            {
              ingredientsFunc(meal).map(i=>{
                return(
                  <View key={i} className="flex-row space-x-4">
                      <View style={{width:hp(1.5),height:hp(1.5)}} className="bg-amber-300 rounded-full"/>
                      <View className="flex-row space-x-2">
                        <Text style={{fontSize:hp(1.4)}} className="font-extrabold text-neutral-600">{meal["strMeasure"+i]}</Text>
                        <Text style={{fontSize:hp(1.4)}} className="font-extrabold text-neutral-600">{meal["strIngredient"+i]}</Text>
                        </View>
                  </View>
                )
              })
            }
          </View>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
          <Text style={{fontSize:hp(1.5)}} className="font-bold flex-1 text-neutral-700">
            Instruction
          </Text>
          <Text style={{fontSize:hp(1.6)}} className="font-bold text-neutral-700">{meal?.strInstructions}</Text>
        </Animated.View>
        {/*meal videos*/}
        {meal.strYoutube && (
          <View className="space-y-4">
          <Text style={{fontSize:hp(2)}} className="font-extrabold flex-1 text-neutral-700">
            Recipe Videos
          </Text>
          <View>
            <YoutubePlayer videoId={getYoutubeVidoeId(meal.strYoutube)} height={hp(30)}/>
            </View>
          </View>
        )}
        </View>
      )}
    </ScrollView>
  );
}
