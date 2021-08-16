import React from 'react';
import { View, Text } from 'react-native';
import currencyFormatter from 'currency-formatter';

import { MovieFullInfo } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
  movieFull: MovieFullInfo;
  cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  return (
    <>
      {/* Details */}
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="star-outline" color="grey" size={16} />

          <Text>{movieFull.vote_average}</Text>

          <Text>
            {' '}
            - {movieFull.genres.map((genre) => genre.name).join(', ')}
          </Text>
        </View>

        {/* Overview */}
        <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
          Overview
        </Text>

        <Text style={{ fontSize: 16 }}>{movieFull.overview}</Text>

        {/* Budget */}
        <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
          Budget
        </Text>

        <Text style={{ fontSize: 16 }}>
          {currencyFormatter.format(movieFull.budget, { code: 'USD' })}
        </Text>
      </View>

      {/* Casting */}
      <View style={{ marginTop: 10, marginBottom: 100 }}>
        <Text
          style={{
            fontSize: 25,
            marginTop: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}
        >
          Casting
        </Text>

        <FlatList
          data={cast}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, height: 80 }}
        />
      </View>
    </>
  );
};
