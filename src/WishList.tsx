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
    changeWishesStatus: (wishId: string, statusValue: boolean)=> void
}

export const WishList = (props: WishListPropsType) => {

    const [os, setOs] = useState<OsTypeForSelect>('Select OS')
    const [error, setError] = useState<string>('')

    const onChangeOSHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setOs(e.currentTarget.value as OsTypeForSelect)
        setError('')
    }

    const onNewWishChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewWishTitle(e.currentTarget.value)
        setError('')
    }

    const addWishHandler = () => {
        if (os !== 'Select OS') {
            if (props.newWishTitle.trim() !== '') {
                props.addNewWish(os)
                props.setNewWishTitle('')
                setOs('Select OS')
                setError('')
            } else return setError('Select Item')
        } else setError('Select OS')
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

    const onChangeStatusHandler = (wishId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeWishesStatus(wishId, e.currentTarget.checked)
    }

    return (
        <div>
            <h1>Phones</h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <input placeholder={"Enter an item"}
                           value={props.newWishTitle}
                           onChange={onNewWishChangeHandler}
                           onKeyDown={onKeyDownHandler}
                    />
                    {error === 'Select Item' ?  <div>{error}</div> : ''}
                </div>
                <div>
                    <select value={os} onChange={onChangeOSHandler}>
                        <option value={"Select OS"}>Select OS</option>
                        <option value={"Android"}>Android</option>
                        <option value={"iOS"}>iOS</option>
                    </select>
                    {error === 'Select OS' ?  <div>{error}</div> : ''}
                </div>
                <button disabled={os === 'Select OS'} onClick={addWishHandler}>Add</button>
            </div>
            <ul>
                {props.wishes.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox"  checked={el.checked}  onChange={(e)=> onChangeStatusHandler(el.id, e)}/>
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
