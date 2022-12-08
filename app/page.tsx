"use client"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'

export default function Home() {
	const [error, setError] = useState(false)
	const [item, setItem] = useState({
		id: '',
		item: ''
	})
	const [itemsData, setItemsData] = useState()

	const getItems = async () => {
		await axios.get('/api/items').then((res) => {
			const { data } = res
			setItemsData(data)
		})
	}

	useEffect(() => {
		getItems()
	},[])

	const reset = () => {
		setItem({
			id: '',
			item: ''
		})
		setError(false)
	}

	const postItem = () => {
		if (item.item === '') return setError(true)

		axios.post('/api/items', {item}).then(() => {
			reset()
			getItems()
		})
	}

	const updateItem = () => {
		if (item.item === '') return setError(true)

		axios.put('/api/items', {item}).then(() => {
			reset()
			getItems()
		})
	}

	const deleteItem = (id: string) => {
		axios.delete('/api/items', {
			params: {
				id
			}
		}).then(() => {
			getItems()
		})
	}

	return (
		<div className="h-screen flex justify-center items-center bg-gradient-to-r from-teal-500 to-emerald-300 p-4 sm:p-2">
			<div className="rounded-md overflow-y-auto w-full h-[28rem] sm:w-3/4 md:w-1/2 sm:h-[30rem] px-3 pb-3 bg-white shadow-md">
				<div className="flex justify-between mb-2 sticky top-0 bg-white py-3">
					<input
						type="text"
						placeholder="Items"
						onChange={(e) => setItem({...item, item:e.target.value})}
						value={item.item}
						className={`p-2 w-full text-slate-600 rounded-md outline-none ${error ? "border-solid border-2 border-red-400 focus:border-red-400" : "border-solid border-2 border-slate-200 focus:border-teal-400"}`}
					/>
					{
						item.id ?
						<button
							className="px-7 py-2 ml-2 bg-amber-500 rounded-md text-base text-white shadow-md"
							onClick={() => updateItem()}
						>
							Edit
						</button> :
						<button
							className="px-7 py-2 ml-2 bg-teal-500 rounded-md text-base text-white shadow-md"
							onClick={() => postItem()}
						>
							Add
						</button>
					}
				</div>
				<div className="flex flex-col">
					{
						!itemsData && <div className="w-full"><p className="text-lg text-center">Loading</p></div>
					}
					{
						itemsData?.length === 0 && <div className="w-full"><p className="text-lg text-center">Data empty</p></div>
					}
					{
						itemsData?.length > 0 &&
						itemsData.map((data) => {
							return (
								<div className="flex justify-between bg-teal-100 rounded-md p-2 w-full items-center mb-2">
									<p className="text-teal-700">{data.item}</p>
									<Menu as="div" className="inline-block text-left">
							        	<Menu.Button className="bg-teal-400 rounded-full p-2">
							          		<EllipsisVerticalIcon className="w-6 h-6 text-white"/>
							        	</Menu.Button>
							        	<Transition
									        enter="transition duration-100 ease-out"
									        enterFrom="transform scale-95 opacity-0"
									        enterTo="transform scale-100 opacity-100"
									        leave="transition duration-75 ease-out"
									        leaveFrom="transform scale-100 opacity-100"
									        leaveTo="transform scale-95 opacity-0"
									    >
								        	<Menu.Items className="absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								          		<div className="py-1 flex flex-col">
								            		<Menu.Item>
										                <button
										                  onClick={() => setItem(data)}
										                  className='inline-block hover:bg-teal-100 text-left p-2'
										                >
										                  Edit
										                </button>
								            		</Menu.Item>
								            		<Menu.Item>
										                <button
										                  onClick={() => deleteItem(data.id)}
										                  className='inline-block hover:bg-teal-100 text-left p-2'
										                >
										                  Delete
										                </button>
								            		</Menu.Item>
								          		</div>
								        	</Menu.Items>
									    </Transition>
								    </Menu>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}