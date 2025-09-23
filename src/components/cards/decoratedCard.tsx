import React, { ReactNode } from "react";
import './decoratedCard.scss'

interface DecoratedCardProps {
  children: ReactNode;
}
const DecoratedCard: React.FC<DecoratedCardProps> = ({ children }) => {
    return (
        <div className="decorated-card-container rounded-4 p-3 col-12 col-lg-12">
            {
                children
            }
        </div>
    )
}
export default DecoratedCard