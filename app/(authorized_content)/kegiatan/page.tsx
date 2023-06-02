import CardActivity from "./card-activity"
import CreateActivityForm from "./form-create"

export default function KegiatanPage() {
  return (
    <div>
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Kelola Kegiatan</h1>
        <CreateActivityForm />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2].map((item) => (
          <CardActivity key={item} />
        ))}
      </div>
    </div>
  )
}
