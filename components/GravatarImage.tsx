import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import * as Crypto from 'expo-crypto';

const GravatarImage = ({ email, size = 50 }) => {
  const [hash, setHash] = useState('');

  useEffect(() => {
    const computeHash = async () => {
      const normalizedEmail = email.trim().toLowerCase();
      const emailHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        normalizedEmail
      );
      setHash(emailHash.toLowerCase());
    };

    computeHash();
  }, [email]);

  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}`;

  return (
    <Image
      source={{ uri: gravatarUrl }}
      style={{ width: size, height: size }}
    />
  );
};

export default GravatarImage;
