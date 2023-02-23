const ClipMeta = () => {
    return (
        <View>
            <Text type="brightSubHeading" style={{ fontSize: 16, fontWeight: '700' }}>
                @{owner}
            </Text>
            <Text type="brightSubHeading" style={{ fontSize: 18 }}>
                {title}
            </Text>
            <Text style={{ color: '#fff' }}>{description}</Text>
        </View>
    );
}

export default ClipMeta;