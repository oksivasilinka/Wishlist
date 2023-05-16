import React, {ChangeEvent, useState} from 'react';
import {OsType, WishesDataPropsType} from "./App";

export type WishListPropsType = {
    wishes: WishesDataPropsType[]
    addWish: (newTitle: string, newOs: OsType)=> void
}

export const WishList = (props: WishListPropsType) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [newOs, setNewOs] = useState<OsType>('All')

    const addWishHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addNewTitleHandler = () => {
        if (newTitle.trim() !== '') {
            props.addWish(newTitle, newOs)
            setNewTitle('')
            setNewOs('All')
        }
    }

    const changeOsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setNewOs(e.currentTarget.value as OsType)
    }

    return (
        <div>
            <h1>Phones</h1>
            <div>
                <input value={newTitle} onChange={addWishHandler} placeholder={"Enter an item"}/>
                <select value={newOs} onChange={changeOsHandler}>
                    <option selected value="All">Select OS</option>
                    <option value="Android">Android</option>
                    <option value="iOS">iOS</option>
                </select>
                <button onClick={addNewTitleHandler}>Add</button>
            </div>
            <ul>
                {props.wishes.map(el =>  {
                    return (
                            <li key={el.id}>
                                <input type="checkbox"
                                       checked={el.checked}/>
                                <span> {el.title}</span>
                                <span> / OS: </span>
                                <span> {el.OS} </span>
                                <button>X</button>
                            </li>
                        )
                    }
                )}

            </ul>
            <div>
                FILTER BY:
                <div>
                    <select>
                        <option value="All">All</option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
