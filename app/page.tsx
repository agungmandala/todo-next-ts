"use client"
import { useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'

export default function Home() {
	const [item, setItem] = useState('')

	return (
		<div className="h-screen flex justify-center items-center bg-gradient-to-r from-teal-500 to-emerald-300 p-4 sm:p-2">
			<div className="rounded-md w-full h-3/4 sm:w-3/4 md:w-1/2 sm:h-1/2 p-3 bg-white">
				<div className="flex justify-between">
					<input type="text" placeholder="Items" onChange={(e) => setItem(e.target.value)} value={item} className="p-2 w-full text-slate-600 rounded-md border-solid border-2 border-slate-200 outline-none focus:border-teal-400"/>
					<button className="px-7 py-2 ml-2 bg-teal-500 rounded-md text-base text-white shadow-md" onClick={() => {}}>Add</button>
				</div>
				<div className="flex mt-5">
					<div className="flex justify-between bg-teal-100 rounded-md p-2 w-full items-center">
						<p className="text-teal-700">Test test test test test test</p>
						<Menu as="div" className="relative inline-block text-left">
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
					        	<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					          		<div className="py-1 flex flex-col">
					            		<Menu.Item>
							                <button
							                  onClick={() => {}}
							                  className='inline-block hover:bg-teal-100 text-left p-2'
							                >
							                  Edit
							                </button>
					            		</Menu.Item>
					            		<Menu.Item>
							                <button
							                  onClick={() => {}}
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
				</div>
			</div>
		</div>
	)
}