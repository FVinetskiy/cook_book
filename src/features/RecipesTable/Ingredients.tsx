const Ingredients = (props: any) => {
  const { data } = props;

  return (
    <ul>
      {data.basicIngredients.map((item: any) => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
};

export default Ingredients;
