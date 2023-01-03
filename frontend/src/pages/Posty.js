import PostyList from "../components/posty/PostyList"

const DUMMY_DATA = [
  {
    id: '1',
    tytul: 'Kocham Reacta',
    tresc:
      'Bardzo lubie technologie react'
  },
  {
    id: '2',
    tytul: 'Studiaaaaaaaaaaaaaaaaa',
    tresc:
      'Bardzo lubie studiaaaaaaaaa'
  },
];


function Posty(){
  return <section>
    <h1>Posty</h1>
    <PostyList posty={DUMMY_DATA} />
  </section>
}
export default Posty;
