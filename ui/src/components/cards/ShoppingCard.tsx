import { FC, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
// ..custom
import productImg from "@/assets/images/product.png";
import { ICartInventory } from "@/common/interfaces";

type ISelectQuantityProps = {
  defaultValue: number;
  onSelect: (factor: number) => void;
};

type IShoppingCardProps = {
  item: ICartInventory,
  onChangeQuantity: (item: ICartInventory) => void,
  onDeleteItem: (item: ICartInventory) => void,
}

const SelectQuantity: FC<ISelectQuantityProps> = ({ defaultValue, onSelect }) => {
  
  //..evt handlers
  const handleValueChange = (val: string) => {
    onSelect(parseInt(val));
  };


  return (
    <Select value={defaultValue.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select Quantity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Quantity</SelectLabel>
          <SelectItem value="1">Item: 1</SelectItem>
          <SelectItem value="2">Items: 2</SelectItem>
          <SelectItem value="3">Items: 3</SelectItem>
          <SelectItem value="4">Items: 4</SelectItem>
          <SelectItem value="5">Items: 5</SelectItem>
          <SelectItem value="6">Items: 6</SelectItem>
          <SelectItem value="7">Items: 7</SelectItem>
          <SelectItem value="8">Items: 8</SelectItem>
          <SelectItem value="9">Items: 9</SelectItem>
          <SelectItem value="10">Items: 10</SelectItem>
          <SelectItem value="11">Items: 11</SelectItem>
          <SelectItem value="12">Items: 12</SelectItem>
          <SelectItem value="13">Items: 13</SelectItem>
          <SelectItem value="14">Items: 14</SelectItem>
          <SelectItem value="15">Items: 15</SelectItem>
          <SelectItem value="16">Items: 16</SelectItem>
          <SelectItem value="17">Items: 17</SelectItem>
          <SelectItem value="18">Items: 18</SelectItem>
          <SelectItem value="19">Items: 19</SelectItem>
          <SelectItem value="20">Items: 20</SelectItem>
          <SelectItem value="21">Items: 21</SelectItem>
          <SelectItem value="22">Items: 22</SelectItem>
          <SelectItem value="23">Items: 23</SelectItem>
          <SelectItem value="24">Items: 24</SelectItem>
          <SelectItem value="25">Items: 25</SelectItem>
          <SelectItem value="26">Items: 26</SelectItem>
          <SelectItem value="27">Items: 27</SelectItem>
          <SelectItem value="28">Items: 28</SelectItem>
          <SelectItem value="29">Items: 29</SelectItem>
          <SelectItem value="30">Items: 30</SelectItem>
          <SelectItem value="31">Items: 31</SelectItem>
          <SelectItem value="32">Items: 32</SelectItem>
          <SelectItem value="33">Items: 33</SelectItem>
          <SelectItem value="34">Items: 34</SelectItem>
          <SelectItem value="35">Items: 35</SelectItem>
          <SelectItem value="36">Items: 36</SelectItem>
          <SelectItem value="37">Items: 37</SelectItem>
          <SelectItem value="38">Items: 38</SelectItem>
          <SelectItem value="39">Items: 39</SelectItem>
          <SelectItem value="40">Items: 40</SelectItem>
          <SelectItem value="41">Items: 41</SelectItem>
          <SelectItem value="42">Items: 42</SelectItem>
          <SelectItem value="43">Items: 43</SelectItem>
          <SelectItem value="44">Items: 44</SelectItem>
          <SelectItem value="45">Items: 45</SelectItem>
          <SelectItem value="46">Items: 46</SelectItem>
          <SelectItem value="47">Items: 47</SelectItem>
          <SelectItem value="48">Items: 48</SelectItem>
          <SelectItem value="49">Items: 49</SelectItem>
          <SelectItem value="50">Items: 50</SelectItem>
          <SelectItem value="51">Items: 51</SelectItem>
          <SelectItem value="52">Items: 52</SelectItem>
          <SelectItem value="53">Items: 53</SelectItem>
          <SelectItem value="54">Items: 54</SelectItem>
          <SelectItem value="55">Items: 55</SelectItem>
          <SelectItem value="56">Items: 56</SelectItem>
          <SelectItem value="57">Items: 57</SelectItem>
          <SelectItem value="58">Items: 58</SelectItem>
          <SelectItem value="59">Items: 59</SelectItem>
          <SelectItem value="60">Items: 60</SelectItem>
          <SelectItem value="61">Items: 61</SelectItem>
          <SelectItem value="62">Items: 62</SelectItem>
          <SelectItem value="63">Items: 63</SelectItem>
          <SelectItem value="64">Items: 64</SelectItem>
          <SelectItem value="65">Items: 65</SelectItem>
          <SelectItem value="66">Items: 66</SelectItem>
          <SelectItem value="67">Items: 67</SelectItem>
          <SelectItem value="68">Items: 68</SelectItem>
          <SelectItem value="69">Items: 69</SelectItem>
          <SelectItem value="70">Items: 70</SelectItem>
          <SelectItem value="71">Items: 71</SelectItem>
          <SelectItem value="72">Items: 72</SelectItem>
          <SelectItem value="73">Items: 73</SelectItem>
          <SelectItem value="74">Items: 74</SelectItem>
          <SelectItem value="75">Items: 75</SelectItem>
          <SelectItem value="76">Items: 76</SelectItem>
          <SelectItem value="77">Items: 77</SelectItem>
          <SelectItem value="78">Items: 78</SelectItem>
          <SelectItem value="79">Items: 79</SelectItem>
          <SelectItem value="80">Items: 80</SelectItem>
          <SelectItem value="81">Items: 81</SelectItem>
          <SelectItem value="82">Items: 82</SelectItem>
          <SelectItem value="83">Items: 83</SelectItem>
          <SelectItem value="84">Items: 84</SelectItem>
          <SelectItem value="85">Items: 85</SelectItem>
          <SelectItem value="86">Items: 86</SelectItem>
          <SelectItem value="87">Items: 87</SelectItem>
          <SelectItem value="88">Items: 88</SelectItem>
          <SelectItem value="89">Items: 89</SelectItem>
          <SelectItem value="90">Items: 90</SelectItem>
          <SelectItem value="91">Items: 91</SelectItem>
          <SelectItem value="92">Items: 92</SelectItem>
          <SelectItem value="93">Items: 93</SelectItem>
          <SelectItem value="94">Items: 94</SelectItem>
          <SelectItem value="95">Items: 95</SelectItem>
          <SelectItem value="96">Items: 96</SelectItem>
          <SelectItem value="97">Items: 97</SelectItem>
          <SelectItem value="98">Items: 98</SelectItem>
          <SelectItem value="99">Items: 99</SelectItem>
          <SelectItem value="100">Items: 100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export const ShoppingCardItem: FC<IShoppingCardProps> = ({ item, onChangeQuantity, onDeleteItem }) => {

    // ..evt handlers
    const handleFactorChange = (qtity: number) => {
      const newItem: ICartInventory = { item: item.item, count: qtity };
      onChangeQuantity(newItem); 
    };

    const handleItemDelete = () => onDeleteItem(item);
    
  return (
    <div className="flex items-center justify-between px-8 py-4 my-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800 w-100">
      <section className="flex items-center">
        <img
          src={productImg}
          className="w-20 h-20 p-2 mx-4 overflow-hidden bg-white rounded-full shadow-lg"
        />
        <div className="flex flex-col items-start justify-between p-2 mx-4">
          <h1 className="text-2xl font-bold text-center text-gray-600 dark:text-white">
            {item.item.name}
          </h1>
          <div className="flex flex-col items-start justify-between mt-4">
            <p className="mr-4 text-base">
              Unit price: <span className="font-bold">${Number(item.item.price).toFixed(2)}</span>
            </p>
            <div className="flex items-center mt-2">
              <span className="mr-2 font-bold">Quantity: </span>
              <SelectQuantity defaultValue={item.count} onSelect={handleFactorChange} />
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center">
        <p className="mr-4 text-xl font-bold lg:text-3xl">${(item.count * Number(item.item.price)).toFixed(2)}</p>
        <Button
          onClick={handleItemDelete}
          variant="destructive" size="icon" className="text-3xl">
            <Trash2 />
        </Button>
      </section>
    </div>
  );
};

export const ShoppingCardEmpty: FC = () => {    
  return (
    <div className="flex items-center justify-between px-8 py-4 my-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800 w-100">
      <section className="flex items-center">
        <img
          src={productImg}
          className="w-20 h-20 p-2 mx-4 overflow-hidden bg-white rounded-full shadow-lg min-w-20 min-h-20"
        />
        <div className="flex flex-col items-start justify-between p-2 mx-4">          
          <div className="flex flex-col items-start justify-between mt-4">
            <p className="mr-4 text-base">
              No items, please select an Item to checkout
            </p>            
          </div>
        </div>
      </section>      
    </div>
  );
};


