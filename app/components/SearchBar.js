import React from 'react';
import {useTheme} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as Animatable from 'react-native-animatable';

const SearchBar = ({visible, onTextChange}) => {
  const {colors} = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    onTextChange(query);
  };
  if (!visible) return null;
  return (
    <Animatable.View animation="bounceInDown">
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon={() => (
          <Feather name="search" color={colors.placeholder} size={20} />
        )}
        clearIcon={() => (
          <EvilIcons
            name="close"
            color={colors.placeholder}
            size={20}
            onPress={() => onChangeSearch('')}
          />
        )}
      />
    </Animatable.View>
  );
};

export default SearchBar;
