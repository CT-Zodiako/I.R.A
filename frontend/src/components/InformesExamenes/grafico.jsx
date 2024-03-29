import { Chart } from 'react-google-charts';

export const GraficoInforme = () => {
    return(
        <div>
            <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Cargando gráfico</div>}
            data={[
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7],
            ]}
            options={{
                title: 'My Daily Activities',
            }}
            rootProps={{ 'data-testid': '1' }}
            />
      </div>
    );
}