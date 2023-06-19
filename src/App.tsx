import React, {useState} from 'react';
import './App.css';
import {OsTypeForSelect, WishList} from "./WishList";
import {v1} from "uuid";

export type OsType = "All" | "iOS" | "Android" | OsTypeForSelect
export type ActivityTypeForSelect = "All" | "Active" | "Completed"

export type WishesDataPropsType = {
    id: string
    title: string
    OS: OsType
    checked: boolean
}

function App() {
    const [osFilter, setOsFilter] = useState<OsType>("All")
    const [activity, setActivity] = useState<ActivityTypeForSelect>('All')
    const [newWishTitle, setNewWishTitle] = useState('')
    const [wishes, setWishes] = useState<WishesDataPropsType[]>([
        {id: v1(), title: 'Samsung Galaxy S23', OS: "Android", checked: true},
        {id: v1(), title: 'IPhone 13 ProMax', OS: "iOS", checked: true},
        {id: v1(), title: 'Xiaomi 13', OS: "Android", checked: true},
        {id: v1(), title: 'Huawei', OS: "Android", checked: false},
        {id: v1(), title: 'Iphone 14', OS: "iOS", checked: false},
    ])



    const addNewWish = (os: OsTypeForSelect) => {
        setWishes([{id: v1(), title: newWishTitle, OS: os, checked: false}, ...wishes])
    }

    const removeWish = (id: string) => {
        setWishes(wishes.filter(el => el.id != id))
    }

    const wishesWhatWeWantToSee = osFilter === "All" ? wishes : wishes.filter(el => el.OS === osFilter)
    const filterWishesByActivity = activity === "All" ? wishesWhatWeWantToSee
        : activity === "Completed" ? wishesWhatWeWantToSee.filter(el=> el.checked)
            : wishesWhatWeWantToSee.filter(el=> !el.checked)

    const changeWishesStatus = (wishId: string, statusValue: boolean) => {
        setWishes(wishes.map(el => el.id === wishId ? ({ ...el, checked: statusValue}) : el))
    }


    return (
        <div className="App">

            <WishList
                removeWish={removeWish}
                wishes={filterWishesByActivity}
                addNewWish={addNewWish}
                setNewWishTitle={setNewWishTitle}
                newWishTitle={newWishTitle}
                setOsFilter={setOsFilter}
                activity={activity}
                setActivity={setActivity}
                changeWishesStatus={changeWishesStatus}/>
        </div>
    );
}

export default App;