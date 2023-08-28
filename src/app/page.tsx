import global from '@/styles/global'
import {Client} from '@notionhq/client'
import {TbPointFilled} from 'react-icons/tb'

async function getData() {
  const notion = new Client({auth: process.env.NOTION_TOKEN})
  const databaseId = process.env.NOTION_DATABASE_ID

  const response = await notion.databases.query({
    database_id: `${databaseId}`,
    filter: {
      and: [
        {
          property: 'Project',
          relation: {
            contains: '639dd3d64deb4fdbadbdb23714622cd8'
          }
        },
        {
          property: 'Sub-tasks',
          relation: {
            is_empty: true
          }
        }
      ]
    },
    sorts: [
      {
        property: 'Due',
        direction: 'ascending'
      }
    ]
  })
  return response
}

export default async function Home() {
  const {results} = await getData()

  return (
    <div className='mt-5'>

      {/* db views */}
      <div className={`flex flex-row gap-3 border-b border-b-[${global.text}] mb-4`}>
        <div className='flex flex-row max-w-[75%] border-b border-b-black pb-1'>
          <div className={`flex flex-row gap-1 p-1 items-center rounded-lg hover:bg-[#efefef] cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-discount-check-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#37352f" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" stroke-width="0" fill="currentColor" />
            </svg>

            <p className={`font-medium`}>My Stack</p>
          </div>
        </div>
      </div>

      {/* iteration */}
      <div className='grid grid-cols-5 gap-x-5 gap-y-4'>
        {results.map((item: any) => {
          const { Due, Status, 'Task name': TaskName } = item.properties

          // TaskName
          const icon = item?.icon?.file?.url
          const titleObject = TaskName?.title[0]
          const title =  titleObject?.text?.content

          // Due
          const dateAPI = Due.date?.start
          const fechaObj = new Date(dateAPI)
          const año = fechaObj.getFullYear()
          const mes = String(fechaObj.getMonth() + 1).padStart(2, '0')
          const día = String(fechaObj.getDate() + 1).padStart(2, '0')
          const due = `${día}/${mes}/${año}`

          // Status
          const status = Status.status?.name

          const bgColor = Status?.status?.color === 'green' ? '#dbeddb' : 
                          Status?.status?.color === 'blue' ? '#d3e5ef' : 
                          Status?.status?.color === 'default' ? '#e3e2e0' : null

          const pointColor = Status?.status?.color === 'green' ? '#6c9b7d' : 
                             Status?.status?.color === 'blue' ? '#5b97bd' : 
                             Status?.status?.color === 'default' ? '#91918e' : null

          return (
            <div key={item.id} className={`border border-[${global.text}] p-4 hover:bg-[#f9f9f8] cursor-pointer shadow`}>

              {/* title */}
              <div className='flex flex-row items-center gap-1 mb-2'>
                {icon
                  ? (
                    <img className='w-5 h-5' src={icon} alt='icon' />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-discount-check-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#37352f" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" stroke-width="0" fill="currentColor" />
                    </svg>
                  )
                }

                <p className={`font-semibold text-[${global.text}]`}>{title}</p>
              </div>

              {/* due */}
              {dateAPI
                && (
                  <div className='pb-2'>
                    <p className={`text-sm text-${global.text}`}>{due}</p>
                  </div>
                )
              }

              {/* status */}
              <div className={`flex flex-row`}>
                <div style={{ backgroundColor: `${bgColor}` }} className='flex flex-row items-center gap-1 pl-1 pr-3 rounded-full'>
                  <div className=''>
                    <TbPointFilled color={pointColor} />
                  </div>
                  <p className={`text-sm text-${global.text}`}>{status}</p>
                </div>
              </div>
            </div>
          )
        })}
        {/* new btn */}
        <div className='flex items-center justify-center border border-[#e7e7e6] bg-[#fff] hover:bg-[#efefef] cursor-pointer'>
          <div className='flex flex-row items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c2c2c0" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            <p className={`text-[#c2c2c0]`}>New</p>
          </div>
        </div>
      </div>
    </div>
  )
}
