import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ActivityTypeForSelect, OsType, WishesDataPropsType} from "./App";

export type OsTypeForSelect = "Android" | "iOS" | "Select OS"

export type WishListPropsType = {
    wishes: WishesDataPropsType[]
    addItem?: (newItem: string, wishFilter: OsTypeForSelect) => void
    osFilter?: OsType
    setOsFilter: (osFilter: OsType) => void
    setNewWishTitle: (text: string) => void
    addNewWish: (os: OsTypeForSelect) => void
    newWishTitle: string
    removeWish: (wishId: string) => void
    activity: ActivityTypeForSelect
    setActivity: (activity: ActivityTypeForSelect) => void
}

export const WishList = (props: WishListPropsType) => {
    // let [newItem, setNewItem] = useState("")
    // let [os, setOS] = useState<OsTypeForSelect>("Select OS")
    //
    // const onNewItemChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 	setNewItem(e.currentTarget.value)
    // }
    //
    // const addItemHandler = () => {
    // 	if(os !== "Select OS"){
    // 		if (newItem.trim() !== "") {
    // 			props.addItem(newItem, os)
    // 			setNewItem("")
    // 			setOS("Select OS")
    // 		}
    // 	}
    // 	else return
    // }
    //
    // const onChangeOSHandler = (e:ChangeEvent<HTMLSelectElement>) => {
    // 	setOS(e.currentTarget.value as OsTypeForSelect)
    // }

    const [os, setOs] = useState<OsTypeForSelect>('Select OS')

    const onChangeOSHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setOs(e.currentTarget.value as OsTypeForSelect)
    }

    const onNewWishChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewWishTitle(e.currentTarget.value)
    }

    const addWishHandler = () => {
        if (props.newWishTitle.trim() !== '' && os !== 'Select OS') {
            props.addNewWish(os)
            props.setNewWishTitle('')
            setOs('Select OS')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addWishHandler()
        }
    }

    const filterOsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setOsFilter(e.currentTarget.value as OsType)
    }

    const filterActivityHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setActivity(e.currentTarget.value as ActivityTypeForSelect)
    }

    const onClickHandler = (id: string) => {
        props.removeWish(id)
    }

    return (
        <div>
            <h1>Phones</h1>
            <div>
                <input placeholder={"Enter an item"}
                       value={props.newWishTitle}
                    // onChange={onNewItemChangeHandler}
                       onChange={onNewWishChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <select value={os} onChange={onChangeOSHandler}>
                    <option value={"Select OS"}>Select OS</option>
                    <option value={"Android"}>Android</option>
                    <option value={"iOS"}>iOS</option>
                </select>
                <button disabled={os === 'Select OS'} onClick={addWishHandler}>Add</button>
            </div>
            <ul>
                {props.wishes.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.checked}/>
                            <span> {el.title} </span>
                            <span> / OS: </span>
                            <span> {el.OS} </span>
                            <button onClick={() => {
                                onClickHandler(el.id)
                            }}>X
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                FILTER BY:
                <div>
                    <select value={props.osFilter} onChange={filterOsHandler}>
                        <option value="All">All</option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                    </select>
                </div>
                FILTER BY ACTIVITY:
                <div>
                    <select value={props.activity} onChange={filterActivityHandler}>
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
