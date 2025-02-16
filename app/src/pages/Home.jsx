import React from 'react'
import Top5Films from '../tables/Top5Films';
import Top5Actors from '../tables/Top5Actors';

export const Home = () => {
  return (
    <div>
      <Top5Films/>
      <Top5Actors/>
    </div>
  )
}
