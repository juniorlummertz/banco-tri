import {formatCurrency} from "../../utils/currency";
import {getCategoryLabel} from "../../utils/category";
/*Componente responsável por apresentar as despesas agrupadas por categoria.
Ele não realiza cálculos financeiros.
O componente recebe os dados já processados pelo financialService e apenas os apresenta.
Isso mantém a regra de negócio separada da camada de interface.*/
export default function CategorySummary({expensesByCategory}) {
     /* Object.entries() transforma um objeto em uma lista.
        Isso permite utilizar map() para gerar elementos React dinamicamente.*/
    const categories = Object.entries(expensesByCategory)
    /* Caso ainda não existam despesas, apresentamos uma mensagem em vez
    de deixar a seção vazia.*/
    if (categories.length === 0) {
        return (<section className="category-painel">
            <h2>Despesas por categoria</h2>
            <p>Nenhuma despesa registrada.</p>
        </section>)
    } return (
        <section className="category-painel">
            <div className="category-header">
                <div><span className="section-label"> FinUp </span>
                    <h2>Despesas por categoria</h2>
                </div>
            </div>
            <div className="category-list">
            {/* map() percorre todas as categorias e cria um elemento visual para cada uma.*/}
            {categories.map(([category, amount]) => (
                <div className="category-item" key={category}>
                    {/*Internamente armazenamos códigos como "food".
                    getCategoryLabel() transforma esse código
                    em um texto amigável, como "Alimentação".*/}
                    <span>{getCategoryLabel(category)}</span>
                    <strong>{formatCurrency(amount)}</strong>
                </div>
                ))}
            </div>
        </section>
    )
}