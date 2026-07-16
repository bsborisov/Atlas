import { Card } from "@/components/ui/Card"

const Details = () => {
  return (
    <div className="w-full mb-6">
      <div className="w-full h-100 grid grid-cols-1">
        <Card
          cardData={{
            title: "Details",
            value: "Value3"
          }}
        >
          Value333
        </Card>
      </div>
    </div>
  )
}

export default Details