const MiniProfile=(props)=>{
    return(
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              {props.title}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
              {props.text}
            </dd>
          </div>
    )

}

export default MiniProfile;