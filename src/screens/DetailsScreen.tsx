import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';

import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailsScreen'> {}

export const DetailsScreen = ({ route, navigation }: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);

  return (
    <ScrollView>
      <View style={styles.imgContainer}>
        <View style={styles.imgBorder}>
          <Image source={{ uri }} style={styles.posterImg} />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator size={30} color="grey" style={{ marginTop: 20 }} />
        ) : (
          <MovieDetails movieFull={movieFull!} cast={cast} />
        )}
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.pop()}>
        <Icon color="white" name="arrow-back-outline" size={30} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: 'black',
    borderRadius: 50,
    opacity: 0.5,
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 10,
    left: 10,
  },
  imgContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  imgBorder: {
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    flex: 1,
    overflow: 'hidden',
  },
  posterImg: {
    flex: 1,
  },

  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
