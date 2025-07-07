import ReactStars from 'react-stars';

const Rating = ({newRating}) => {
  return (
    <ReactStars
      count={5}
      value={newRating}
      size={30}
      color1={'#D9D9D9'} // empty color
      color2={'#E6CA97'} // filled color
      half={true}
      edit={false}
    />
  )
}

export default Rating;
