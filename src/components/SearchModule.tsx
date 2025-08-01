"use client"

import Image from 'next/image'
import styles from './search.module.css'
import Popup from './Popup'
import { useState, useEffect, MouseEvent } from 'react'

interface People {
    id: number,
    name: string,
    phone: string,
    email: string,
    addres: string,
    position_name: string,
    department: string,
    hire_date: string
}

export default function Search() {
    const [people, setPeople] = useState<People[]>([])
    
    useEffect(() => {
        const getPeople = async () => {
            const res = await fetch('http://localhost:3000/')
            const peopleTemp = await res.json()
            setPeople(peopleTemp.data)
        }
        getPeople()
    }, [])

    const SearchPeople = async (info: string) => {
        const res = await fetch(`http://localhost:3000/?term=${info}`)
        const peopleTemp = await res.json()
        setPeople(peopleTemp.data)
    }

    const [isOpen, setIsOpen] = useState(false)

    const togglePopup = () => {
        setIsOpen(!isOpen)
    }

    const [active, setActive] = useState<People>()

    const ClickResult = (e: MouseEvent) => {
        const id = Number(e.currentTarget.id)
        if (id) {
            setActive(people.find(obj => obj.id === id))
        }
        togglePopup()
    }

    useEffect(() => {
    const infoLabels = document.querySelectorAll(`.${styles.InfoLabels}`);
    const personInfo = document.querySelectorAll(`.${styles.PersonInfo}`);

    infoLabels.forEach((infoLabel, index) => {
        const label = infoLabel as HTMLElement;
        const info = personInfo[index] as HTMLElement;

        label.style.height = `${info.offsetHeight}px`;
    });
    }, [active]);

    return (
        <div className={styles.searchDiv}>
            {isOpen && <Popup 
                content={<>

                    <div className={styles.PopupHeader}>
                        <label className={styles.InfoName}>{active.name}</label>
                        <Image 
                            src={"/close.svg"}
                            alt="close"
                            width={20}
                            height={20}
                            priority={false}
                            onClick={togglePopup}
                        />
                    </div>

                    <div className={styles.infoDiv}>

                        <div id="InfoLabelsDiv" className={styles.InfoLinesDiv}>
                            <span className={styles.InfoLabels}>Телефон:</span>
                            <span className={styles.InfoLabels}>Почта:</span>
                            <span className={styles.InfoLabels}>Дата приёма:</span>
                            <span className={styles.InfoLabels}>Должность:</span>
                            <span className={styles.InfoLabels}>Подразделение:</span>
                        </div>

                        <div id="PersonInfoDiv" className={styles.InfoLinesDiv}>
                            <span className={styles.PersonInfo}>{active.phone}</span>
                            <span className={styles.PersonInfo}>{active.email}</span>
                            <span className={styles.PersonInfo}>{active.hire_date}</span>
                            <span className={styles.PersonInfo}>{active.position_name}</span>
                            <span className={styles.PersonInfo}>{active.department}</span>
                        </div>
                    </div>

                    <div className={styles.AddInfoDiv}>
                        <span>Дополнительная информация:</span>
                        <span className={styles.PersonInfo}>Разработчики используют текст в качестве заполнителя макта страницы. Разработчики используют текст в качестве заполнителя макта страницы</span>
                    </div>
                </>}
                handleClose={togglePopup}
            />}
            <div
                className={styles.search}
                >
                    <input
                        onChange={(e) => SearchPeople(e.target.value)}
                    >
                    </input>
                    <Image 
                        src={"/magnifier.svg"}
                        alt="magnifier"
                        width={24}
                        height={24}
                        priority={true}
                    />
            </div>
            <div id="SearchResult"
                className={styles.results}
            >
                {people.map(human => (
                    <div
                        id={human.id.toString()}
                        key={human.id}
                        className={styles.result}
                        onClick={(e) => ClickResult(e)}
                    >
                        <label className={styles.name}>{human.name}</label>
                        <div
                            className={styles.contacts}
                        >
                            <Image 
                                src={"/phone.svg"}
                                alt="phone"
                                width={24}
                                height={24}
                                priority={true}
                            />
                            <label>{human.phone}</label>
                        </div>
                        <div
                            className={styles.contacts}
                        >
                            <Image 
                                src={"/email.svg"}
                                alt="email"
                                width={24}
                                height={24}
                                priority={true}
                            />
                            <label>{human.email}</label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}