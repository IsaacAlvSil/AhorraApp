function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ValidarCredenciales" 
                component={ValidacionCredencialesScreen} 
                options={{ title: "Validación" }} 
            />
            <Stack.Screen 
                name="Transacciones" 
                component={TransaccionesScreen}
                options={{ title: "Transacciones" }} 
            />
            <Stack.Screen 
                name="Menu" 
                component={MenuScreen}
                options={{ title: "Menú Principal" }} 
            />
        </Stack.Navigator>
    );
}